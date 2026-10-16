import ui from "./ui";
import { getCv } from "../data/cv";
import { getProjects, getSpotlight } from "../data/projects";

const shape = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) return [`${key}[${v.length}]`];
    if (v && typeof v === "object") return shape(v, key);
    return [key];
  });

test("English and Spanish UI strings have the same keys", () => {
  expect(shape(ui.es).sort()).toEqual(shape(ui.en).sort());
});

test("CV content has the same structure in both languages", () => {
  const en = getCv("en");
  const es = getCv("es");
  expect(es.experience).toHaveLength(en.experience.length);
  expect(es.education).toHaveLength(en.education.length);
  expect(es.skills).toHaveLength(en.skills.length);
  en.experience.forEach((job, i) => {
    expect(es.experience[i].highlights).toHaveLength(job.highlights.length);
  });
});

test("every project is translated and has a description", () => {
  ["en", "es"].forEach((lang) => {
    getProjects(lang).forEach((p) => {
      expect(p.kind).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.overview).toBeTruthy();
    });
    expect(getSpotlight(lang).surfaces.every((s) => s.description)).toBe(true);
  });
});
