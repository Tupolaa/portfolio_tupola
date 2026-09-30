import React from "react";
import { useLanguage } from "./LangChanger";
import type { Job } from "../types/content";

const Work = () => {
  const { content } = useLanguage();
  const jobs: Job[] = Array.isArray(content.Work?.jobs) ? content.Work.jobs : [];

  return (
    <section className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8 lg:p-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
        {content.Work?.header}
      </h2>

      {/* Timeline */}
      <ol className="relative mx-auto max-w-4xl border-l border-cyan/30 pl-6 md:pl-8">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.title}`} className="relative mb-6 last:mb-0">
            {/* Timeline dot */}
            <span className="absolute top-6 -left-[31px] h-3 w-3 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,255,221,0.6)] md:-left-[39px]" />

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan/5">
              {job.logo && (
                <img
                  src={job.logo}
                  alt=""
                  className="absolute top-4 right-4 h-12 w-12 object-contain opacity-70 drop-shadow-[0_0_6px_rgba(0,255,221,0.3)] transition-all duration-300 group-hover:opacity-90"
                />
              )}

              <h3 className="pr-14 text-lg font-semibold text-foreground">
                {job.title}
              </h3>
              <p className="pr-14 text-sm font-medium text-cyan-light">
                {job.company}
                {job.location && <span className="text-gray-400"> · {job.location}</span>}
              </p>
              <p className="mb-3 text-xs text-cyan-light/70">{job.Timeline}</p>

              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                {job.description}
              </p>

              {Array.isArray(job.tasks) && job.tasks.length > 0 && (
                <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-gray-400 marker:text-cyan">
                  {job.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              )}

              {Array.isArray(job.links) && job.links.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {job.links.map((link) => (
                    <a
                      key={link.link}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-cyan-light transition-all hover:border-cyan/30 hover:bg-white/10"
                    >
                      {link.Name}
                    </a>
                  ))}
                </div>
              )}

              {Array.isArray(job.Tech) && (
                <div className="flex flex-wrap gap-1.5">
                  {job.Tech.map((t, i) => (
                    <img
                      key={i}
                      src={t.icon}
                      alt={t.alt || `Tech ${i + 1}`}
                      className="h-6 w-6 object-contain opacity-70 transition-opacity group-hover:opacity-100"
                      title={t.alt}
                    />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Work;
