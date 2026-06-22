import React, { useState } from "react";
import { CandidateProfile, GithubProfile } from "../types";
import { Github, Plus, Save, Trash2, Sparkles } from "lucide-react";

interface GithubProfilesProps {
  profile: CandidateProfile;
  onUpdateProfile: (profile: CandidateProfile) => void;
}

const createProfile = (): GithubProfile => ({
  id: `gh-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  label: "",
  url: "",
  notes: "",
});

export default function GithubProfiles({ profile, onUpdateProfile }: GithubProfilesProps) {
  const [profiles, setProfiles] = useState<GithubProfile[]>(
    profile.githubProfiles?.length
      ? profile.githubProfiles
      : [
          {
            id: "primary-github",
            label: "Primary GitHub",
            url: profile.website || "",
            notes: "Default portfolio profile shown on the resume unless a job is a better match for another GitHub.",
          },
        ]
  );
  const [saved, setSaved] = useState(false);

  const updateProfile = (id: string, updates: Partial<GithubProfile>) => {
    setProfiles((current) => current.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeProfile = (id: string) => {
    setProfiles((current) => current.filter((item) => item.id !== id));
  };

  const addProfile = () => {
    setProfiles((current) => [...current, createProfile()]);
  };

  const saveProfiles = () => {
    const cleanProfiles = profiles
      .map((item) => ({
        ...item,
        label: item.label.trim(),
        url: item.url.trim(),
        notes: item.notes.trim(),
      }))
      .filter((item) => item.url);

    onUpdateProfile({
      ...profile,
      website: cleanProfiles[0]?.url || profile.website,
      githubProfiles: cleanProfiles,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-faction-panel border border-faction-border rounded shadow-xl p-4 space-y-4 text-faction-text">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-faction-border pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-faction-accent/15 border border-faction-accent-border/40 flex items-center justify-center">
            <Github className="w-5 h-5 text-faction-accent" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider font-mono">GitHub Profile Selector</h2>
            <p className="text-[10px] text-faction-text-muted font-mono max-w-2xl">
              Add multiple GitHub profiles or project portfolios. Gemini will compare these against each job description and choose the most relevant one for the tailored resume header.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={saveProfiles}
          className="px-3 py-2 bg-faction-accent text-black rounded text-xs font-black font-mono flex items-center gap-1.5 cursor-pointer hover:opacity-90"
        >
          <Save className="w-4 h-4" /> Save GitHub Profiles
        </button>
      </div>

      {saved && (
        <div className="text-[11px] font-bold font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-800/40 rounded px-3 py-2">
          GitHub portfolio list saved. Resume tailoring will now use these profiles for job-specific portfolio selection.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {profiles.map((item, index) => (
          <section key={item.id} className="bg-faction-bg border border-faction-border rounded p-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest font-mono text-faction-accent">
                Profile {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProfile(item.id)}
                className="p-1 rounded border border-rose-900/40 text-rose-400 hover:bg-rose-950/30 cursor-pointer"
                title="Remove GitHub profile"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase font-mono text-faction-text-muted mb-1">Display Label</label>
              <input
                value={item.label}
                onChange={(event) => updateProfile(item.id, { label: event.target.value })}
                className="w-full text-xs p-2 bg-faction-panel border border-faction-border rounded text-faction-text font-mono focus:outline-none focus:ring-1 focus:ring-faction-accent"
                placeholder="e.g. AD + Splunk Lab GitHub"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase font-mono text-faction-text-muted mb-1">GitHub URL</label>
              <input
                value={item.url}
                onChange={(event) => updateProfile(item.id, { url: event.target.value })}
                className="w-full text-xs p-2 bg-faction-panel border border-faction-border rounded text-faction-text font-mono focus:outline-none focus:ring-1 focus:ring-faction-accent"
                placeholder="https://github.com/username/project-or-profile"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase font-mono text-faction-text-muted mb-1">What This GitHub Shows</label>
              <textarea
                value={item.notes}
                onChange={(event) => updateProfile(item.id, { notes: event.target.value })}
                rows={4}
                className="w-full text-xs p-2 bg-faction-panel border border-faction-border rounded text-faction-text font-mono focus:outline-none focus:ring-1 focus:ring-faction-accent"
                placeholder="Describe the projects, keywords, tools, or job types this profile is best for..."
              />
            </div>
          </section>
        ))}
      </div>

      <button
        type="button"
        onClick={addProfile}
        className="w-full border border-dashed border-faction-border rounded p-3 text-xs font-black font-mono text-faction-text-muted hover:text-faction-text hover:bg-black/20 cursor-pointer flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Another GitHub Profile
      </button>

      <div className="bg-black/20 border border-faction-border rounded p-3 flex gap-2">
        <Sparkles className="w-4 h-4 text-faction-accent shrink-0 mt-0.5" />
        <p className="text-[10.5px] text-faction-text-muted font-mono leading-relaxed">
          Beta behavior: Gemini receives this list during resume tailoring, compares profile notes and URLs against the job description, and returns the selected GitHub plus a short reason. Keep each note factual so the resume does not exaggerate your background.
        </p>
      </div>
    </div>
  );
}
