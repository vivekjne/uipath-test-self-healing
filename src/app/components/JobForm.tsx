"use client";

import { useState } from "react";

type Errors = Partial<Record<"fName" | "lastName" | "email" | "job", string>>;

export default function JobForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setServerMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrors(data.errors ?? {});
      setServerMsg(data.error ?? "Failed to submit form.");
      return;
    }

    setStatus("success");
    setServerMsg(data.message);
    (e.target as HTMLFormElement).reset();
  }

  const input =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900";
  const label = "mb-1 block text-sm font-medium text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      <h3 className="text-xl font-semibold">Tell us about you</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="fName">
            First Name
          </label>
          <input
            id="fName"
            name="fName"
            type="text"
            className={input}
            placeholder="Ada"
          />
          {errors.fName && (
            <p className="mt-1 text-sm text-red-600">{errors.fName}</p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={input}
            placeholder="Lovelace"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={input}
          placeholder="ada@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className={label} htmlFor="job">
          Job Title
        </label>
        <input
          id="job"
          name="job"
          type="text"
          className={input}
          placeholder="Software Engineer"
        />
        {errors.job && (
          <p className="mt-1 text-sm text-red-600">{errors.job}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 md:w-auto"
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>

      {serverMsg && (
        <div
          className={`rounded-xl p-3 text-sm ${
            status === "success"
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {serverMsg}
        </div>
      )}
    </form>
  );
}
