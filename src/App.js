import React, { useEffect, useMemo, useState, useCallback } from "react";
import apiService from "./services/api";

/**
 * DSA Daily Tracker – single-file React app
 */

export default function App() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getEntries();
      setEntries(data);
      if (data.length > 0 && selected >= data.length) {
        setSelected(0);
      }
    } catch (err) {
      setError('Failed to load entries');
      console.error('Error loading entries:', err);
    } finally {
      setLoading(false);
    }
  }, [selected]);

  // Load entries from API on component mount
  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const empty = {
    day: entries.length + 1,
    topic: "",
    problem: "",
    learned: "",
    links: [{ label: "LeetCode #912", url: "" }],
    iterations: "",
  };
  const [form, setForm] = useState(empty);

  const addLink = () => setForm({ ...form, links: [...form.links, { label: "", url: "" }] });
  const removeLink = (i) => setForm({ ...form, links: form.links.filter((_, idx) => idx !== i) });

  const save = async () => {
    if (!String(form.day).trim() || !form.topic.trim()) return alert("Please fill at least Day and Topic");
    
    try {
      setLoading(true);
      const normalizedForm = normalize(form);
      const newEntry = await apiService.createEntry(normalizedForm);
      const updated = [...entries, newEntry];
      setEntries(updated);
      setSelected(updated.length - 1);
      setForm({ ...empty, day: (Number(form.day) || 0) + 1 });
    } catch (err) {
      setError('Failed to save entry');
      alert('Failed to save entry. Please try again.');
      console.error('Error saving entry:', err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (idx) => {
    try {
      setLoading(true);
      const entry = entries[idx];
      if (!entry) {
        alert('Entry not found');
        return;
      }
      
      const normalizedForm = normalize(form);
      const updatedEntry = await apiService.updateEntry(entry._id, normalizedForm);
      const updated = [...entries];
      updated[idx] = updatedEntry;
      setEntries(updated);
    } catch (err) {
      setError('Failed to update entry');
      alert('Failed to update entry. Please try again.');
      console.error('Error updating entry:', err);
    } finally {
      setLoading(false);
    }
  };

  const editEntry = (idx) => {
    const e = entries[idx];
    setForm({
      day: e.day,
      topic: e.topic,
      problem: e.problem,
      learned: e.learned,
      links: e.links.length ? e.links : [{ label: "", url: "" }],
      iterations: e.iterations.join("\n"),
    });
    setSelected(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const delEntry = async (idx) => {
    try {
      const entry = entries[idx];
      if (!entry) {
        alert('Entry not found');
        return;
      }
      
      if (window.confirm('Are you sure you want to delete this entry?')) {
        setLoading(true);
        await apiService.deleteEntry(entry._id);
        const copy = entries.filter((_, i) => i !== idx);
        setEntries(copy);
        setSelected(Math.max(0, idx - 1));
      }
    } catch (err) {
      setError('Failed to delete entry');
      alert('Failed to delete entry. Please try again.');
      console.error('Error deleting entry:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedEntry = entries[selected] || null;

  const tweetText = useMemo(() => (selectedEntry ? makeTweet(selectedEntry) : ""), [selectedEntry]);

  const copyTweet = async () => {
    try {
      await navigator.clipboard.writeText(tweetText);
      alert("Tweet copied!");
    } catch (e) {
      alert("Could not copy – your browser may block clipboard access.");
    }
  };

  const openPrint = () => window.print();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">DSA Daily Tracker · Slides</h1>
          <div className="flex items-center gap-2">
            {loading && <div className="text-sm text-neutral-600">Loading...</div>}
            <button onClick={copyTweet} className="px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-sm">Copy Tweet</button>
            <button onClick={openPrint} className="px-3 py-2 rounded-xl bg-black text-white text-sm hover:bg-neutral-800">Print / Save as PDF</button>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
            <button onClick={() => setError(null)} className="ml-2 text-red-500 hover:text-red-700">×</button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 py-6">
        {/* Editor */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold mb-4">Create / Edit Entry</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium">Day</label>
              <input type="number" value={form.day} onChange={(e) => setForm({ ...form, day: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">🚀 Topic</label>
              <input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Selection Sort" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">❓ Problem</label>
              <input value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} placeholder="Implement selection sort on [6,3,1,8]" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">📘 Learned</label>
              <textarea value={form.learned} onChange={(e) => setForm({ ...form, learned: e.target.value })} rows={4} placeholder="Swap when a smaller value is found; passes fix positions left→right" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">🔁 Iterations (one per line)</label>
              <textarea value={form.iterations} onChange={(e) => setForm({ ...form, iterations: e.target.value })} rows={5} placeholder="[6, 3, 1, 8]\n[3, 6, 1, 8]\n[1, 6, 3, 8]\n[1, 3, 6, 8]" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 font-mono" />
              <p className="text-xs text-neutral-500 mt-1">Tip: include the initial state too; each new line is a step/pass.</p>
            </div>

            <div>
              <label className="text-sm font-medium">✅ Solved on (links)</label>
              <div className="space-y-2 mt-1">
                {form.links.map((link, i) => (
                  <div key={i} className="grid grid-cols-5 gap-2 items-center">
                    <input className="col-span-2 rounded-xl border border-neutral-300 px-3 py-2" placeholder="Label (e.g., LeetCode #912)" value={link.label} onChange={(e) => {
                      const links = [...form.links];
                      links[i] = { ...links[i], label: e.target.value };
                      setForm({ ...form, links });
                    }} />
                    <input className="col-span-3 rounded-xl border border-neutral-300 px-3 py-2" placeholder="https://..." value={link.url} onChange={(e) => {
                      const links = [...form.links];
                      links[i] = { ...links[i], url: e.target.value };
                      setForm({ ...form, links });
                    }} />
                    {form.links.length > 1 && (
                      <button onClick={() => removeLink(i)} className="text-xs text-red-600 hover:underline">remove</button>
                    )}
                  </div>
                ))}
                <button onClick={addLink} className="text-sm text-blue-600 hover:underline">+ add link</button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Saving...' : 'Save as New'}
              </button>
              <button onClick={() => update(selected)} disabled={loading || entries.length === 0} className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Updating...' : 'Update Current'}
              </button>
            </div>
          </div>
        </section>

        {/* Slide Preview */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-0 overflow-hidden">
          <div className="border-b border-neutral-200 flex items-center justify-between px-5 py-3">
            <h2 className="text-lg font-semibold">Slide Preview</h2>
            <div className="flex items-center gap-2">
              <button disabled={selected<=0} onClick={() => setSelected((s) => Math.max(0, s-1))} className="px-3 py-1.5 rounded-lg border border-neutral-300 disabled:opacity-40">Prev</button>
              <span className="text-sm text-neutral-600">{selectedEntry ? `Entry ${selected+1} of ${entries.length}` : `No entries yet`}</span>
              <button disabled={selected>=entries.length-1} onClick={() => setSelected((s) => Math.min(entries.length-1, s+1))} className="px-3 py-1.5 rounded-lg border border-neutral-300 disabled:opacity-40">Next</button>
            </div>
          </div>

          <div className="p-6">
            {selectedEntry ? <SlideCard entry={selectedEntry} /> : (
              <div className="text-neutral-500 text-sm">Save an entry to preview your slide here.</div>
            )}
          </div>
        </section>

        {/* Entries table */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold mb-3">Your Entries</h2>
          {entries.length === 0 ? (
            <p className="text-sm text-neutral-600">No entries yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-3">Day</th>
                    <th className="py-2 pr-3">Topic</th>
                    <th className="py-2 pr-3">Problem</th>
                    <th className="py-2 pr-3">Links</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr key={i} className="border-b align-top">
                      <td className="py-2 pr-3 font-medium">{e.day}</td>
                      <td className="py-2 pr-3">{e.topic}</td>
                      <td className="py-2 pr-3 text-neutral-600">{e.problem}</td>
                      <td className="py-2 pr-3">
                        <ul className="space-y-1">
                          {e.links.map((l, k) => (
                            <li key={k}><a className="text-blue-600 hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.label || l.url}</a></li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 pr-3 space-x-2 whitespace-nowrap">
                        <button onClick={() => { setSelected(i); }} className="text-blue-600 hover:underline">view</button>
                        <button onClick={() => editEntry(i)} className="text-amber-600 hover:underline" disabled={loading}>edit</button>
                        <button onClick={() => delEntry(i)} className="text-red-600 hover:underline" disabled={loading}>
                          {loading ? 'deleting...' : 'delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <style>{`
        @media print {
          header, .no-print { display: none !important; }
          .print-slide { box-shadow: none !important; border: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}

function SlideCard({ entry }) {
  const { day, topic, problem, learned, links, iterations } = entry;
  return (
    <div className="print-slide mx-auto w-full md:w-[840px] bg-white rounded-3xl shadow-lg border border-neutral-200 p-8">
      <div className="flex items-center gap-3">
        <div className="text-3xl">🗓️</div>
        <h3 className="text-2xl md:text-3xl font-bold">Day {day}</h3>
      </div>

      <div className="mt-6 space-y-5">
        <Row icon="🚀" label="Topic" value={<span className="font-semibold">{topic}</span>} />
        <Row icon="❓" label="Problem" value={<span>{problem}</span>} />
        <Row icon="📘" label="Learned" value={<p className="whitespace-pre-wrap text-neutral-800">{learned}</p>} />

        {iterations && iterations.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-semibold text-neutral-900 mb-2">🔁 Iterations</div>
            <div className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50 font-mono text-sm">
              <ul className="space-y-2">
                {iterations.map((line, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-neutral-500 w-12">{i === 0 ? "Init" : `Step ${i}`}</span><span>{line}</span></li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div>
          <div className="text-sm font-semibold text-neutral-900 mb-2">✅ Solved on</div>
          <ul className="list-disc pl-6 space-y-1">
            {links.map((l, i) => (
              <li key={i}><a className="text-blue-600 hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.label || l.url}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3 items-start">
      <div className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><span>{icon}</span><span>{label}</span></div>
      <div className="text-neutral-900">{value}</div>
    </div>
  );
}

function normalize(form) {
  const iterations = form.iterations
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const links = (form.links || []).filter(l => l.label || l.url);
  return {
    day: Number(form.day) || 1,
    topic: form.topic.trim(),
    problem: form.problem.trim(),
    learned: form.learned.trim(),
    links,
    iterations,
  };
}

function makeTweet(entry) {
  const { day, topic, problem, learned } = entry;
  let text = `📅 Day ${day}\n\n🚀 Topic: ${topic}\n❓ Problem: ${problem}\n📘 Learned: ${learned}`;
  return text;
}