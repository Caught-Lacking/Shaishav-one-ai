/**
 * Curriculum validation tests
 * Run: bun test src/lib/curriculum.test.ts
 */
import { describe, it, expect } from "bun:test";
import {
  subjects,
  streams,
  getStream,
  getSubject,
  getChapter,
  getTopic,
  getStreamSubjects,
  countStreamChapters,
  countStreamTopics,
  countStreamPyqs,
  subjectChaptersByClass,
  type SubjectDef,
  type Chapter,
  type StreamId,
} from "./curriculum";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getAllTopicIds(subject: SubjectDef): string[] {
  return subject.chapters.flatMap((c) => c.topics.map((t) => t.id));
}

function getAllChapterIds(subject: SubjectDef): string[] {
  return subject.chapters.map((c) => c.id);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Subject definitions exist", () => {
  it("has physics, chemistry, biology, maths", () => {
    expect(subjects.physics).toBeDefined();
    expect(subjects.chemistry).toBeDefined();
    expect(subjects.biology).toBeDefined();
    expect(subjects.maths).toBeDefined();
  });
});

describe("Chapter IDs are unique within each subject", () => {
  for (const [id, subject] of Object.entries(subjects)) {
    it(`${id}: no duplicate chapter IDs`, () => {
      const ids = getAllChapterIds(subject);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });
  }
});

describe("Topic IDs are unique within each subject", () => {
  for (const [id, subject] of Object.entries(subjects)) {
    it(`${id}: no duplicate topic IDs`, () => {
      const ids = getAllTopicIds(subject);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });
  }
});

describe("Chapter IDs follow expected pattern", () => {
  for (const [subId, subject] of Object.entries(subjects)) {
    it(`${subId}: all chapter IDs match pattern ${subId}-cN`, () => {
      subject.chapters.forEach((c, i) => {
        expect(c.id).toBe(`${subId}-c${i + 1}`);
      });
    });
  }
});

describe("Topic IDs follow expected pattern", () => {
  for (const [subId, subject] of Object.entries(subjects)) {
    it(`${subId}: all topic IDs match pattern ${subId}-cN-tM`, () => {
      subject.chapters.forEach((ch, ci) => {
        ch.topics.forEach((t, ti) => {
          expect(t.id).toBe(`${subId}-c${ci + 1}-t${ti + 1}`);
        });
      });
    });
  }
});

describe("PYQ counts are positive integers", () => {
  for (const [subId, subject] of Object.entries(subjects)) {
    it(`${subId}: all PYQs > 0`, () => {
      subject.chapters.forEach((ch) => {
        ch.topics.forEach((t) => {
          expect(t.pyq).toBeGreaterThan(0);
        });
      });
    });
  }
});

describe("All chapters have class 11 or 12", () => {
  for (const [subId, subject] of Object.entries(subjects)) {
    it(`${subId}: all chapters are class 11 or 12`, () => {
      subject.chapters.forEach((ch) => {
        expect(ch.class === 11 || ch.class === 12).toBe(true);
      });
    });
  }
});

describe("NCERT Chemistry completeness", () => {
  const chem = subjects.chemistry;

  it("has States of Matter (Class 11)", () => {
    const found = chem.chapters.find(
      (c) => c.class === 11 && c.name.includes("States of Matter"),
    );
    expect(found).toBeDefined();
    expect(found!.topics.length).toBeGreaterThanOrEqual(3);
  });

  it("has Surface Chemistry (Class 12)", () => {
    const found = chem.chapters.find(
      (c) => c.class === 12 && c.name === "Surface Chemistry",
    );
    expect(found).toBeDefined();
  });

  it("has General Principles and Processes of Isolation of Elements (Class 12)", () => {
    const found = chem.chapters.find(
      (c) =>
        c.class === 12 &&
        c.name.includes("General Principles and Processes of Isolation"),
    );
    expect(found).toBeDefined();
  });

  it("has p-Block Elements (Class 12)", () => {
    const found = chem.chapters.find(
      (c) => c.class === 12 && c.name === "p-Block Elements",
    );
    expect(found).toBeDefined();
    expect(found!.topics.length).toBeGreaterThanOrEqual(4);
  });

  it("has Polymers (Class 12)", () => {
    const found = chem.chapters.find(
      (c) => c.class === 12 && c.name === "Polymers",
    );
    expect(found).toBeDefined();
  });

  it("has Chemistry in Everyday Life (Class 12)", () => {
    const found = chem.chapters.find(
      (c) => c.class === 12 && c.name === "Chemistry in Everyday Life",
    );
    expect(found).toBeDefined();
  });

  it("has at least 24 total chapters (NCERT complete)", () => {
    expect(chem.chapters.length).toBeGreaterThanOrEqual(24);
  });
});

describe("NCERT Physics completeness", () => {
  const phy = subjects.physics;

  it("Class 11 has 14 chapters", () => {
    const c11 = phy.chapters.filter((c) => c.class === 11);
    expect(c11.length).toBe(14);
  });

  it("Class 12 has 14 chapters", () => {
    const c12 = phy.chapters.filter((c) => c.class === 12);
    expect(c12.length).toBe(14);
  });

  it("has 28 total chapters", () => {
    expect(phy.chapters.length).toBe(28);
  });
});

describe("NCERT Biology completeness", () => {
  const bio = subjects.biology;

  it("has 33 chapters", () => {
    expect(bio.chapters.length).toBe(33);
  });
});

describe("NCERT Maths completeness", () => {
  const maths = subjects.maths;

  it("has 27 chapters", () => {
    expect(maths.chapters.length).toBe(27);
  });
});

describe("Stream definitions", () => {
  it("NEET uses physics, chemistry, biology", () => {
    expect(streams.neet.subjects).toEqual([
      "physics",
      "chemistry",
      "biology",
    ]);
  });

  it("JEE uses physics, chemistry, maths", () => {
    expect(streams.jee.subjects).toEqual(["physics", "chemistry", "maths"]);
  });

  it("getStream returns correct defaults", () => {
    expect(getStream("neet").id).toBe("neet");
    expect(getStream("jee").id).toBe("jee");
    expect(getStream(null).id).toBe("neet");
    expect(getStream("invalid").id).toBe("neet");
  });
});

describe("Helper functions", () => {
  it("getStreamSubjects returns correct subject count", () => {
    expect(getStreamSubjects("neet").length).toBe(3);
    expect(getStreamSubjects("jee").length).toBe(3);
  });

  it("getSubject finds valid subjects", () => {
    expect(getSubject("physics")?.name).toBe("Physics");
    expect(getSubject("chemistry")?.name).toBe("Chemistry");
    expect(getSubject("biology")?.name).toBe("Biology");
    expect(getSubject("maths")?.name).toBe("Mathematics");
  });

  it("getChapter finds a chapter by id", () => {
    const ch = getChapter("physics", "physics-c1");
    expect(ch?.name).toBe("Units and Measurements");
  });

  it("getTopic finds a topic by id", () => {
    const t = getTopic("physics", "physics-c1", "physics-c1-t1");
    expect(t?.name).toBe("Units & the SI system");
  });

  it("countStreamChapters returns total", () => {
    const neetChapters = countStreamChapters("neet");
    // 28 physics + 25 chem + 33 bio = 86
    expect(neetChapters).toBeGreaterThanOrEqual(80);
  });

  it("countStreamTopics returns total", () => {
    const neetTopics = countStreamTopics("neet");
    expect(neetTopics).toBeGreaterThan(200);
  });

  it("countStreamPyqs returns total", () => {
    const neetPyqs = countStreamPyqs("neet");
    expect(neetPyqs).toBeGreaterThan(300);
  });

  it("subjectChaptersByClass returns 2 groups", () => {
    const groups = subjectChaptersByClass(subjects.physics);
    expect(groups.length).toBe(2);
    expect(groups[0].cls).toBe(11);
    expect(groups[1].cls).toBe(12);
  });
});

describe("High-frequency PYQ topics were boosted", () => {
  it("Photoelectric effect has >= 10 PYQs", () => {
    const ch = subjects.physics.chapters.find(
      (c) => c.name === "Dual Nature of Radiation and Matter",
    );
    const topic = ch?.topics.find((t) => t.name === "Photoelectric effect");
    expect(topic?.pyq).toBeGreaterThanOrEqual(10);
  });

  it("Mendel's laws has >= 9 PYQs", () => {
    const ch = subjects.biology.chapters.find(
      (c) => c.name === "Principles of Inheritance and Variation",
    );
    const topic = ch?.topics.find((t) =>
      t.name.includes("Mendel's laws"),
    );
    expect(topic?.pyq).toBeGreaterThanOrEqual(9);
  });
});
