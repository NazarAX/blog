import type { Project } from "../components/ProjectCard";

export const featured: Project[] = [
  {
    slug: "billing-system",
    title: "High-Throughput Billing System",
    description: "Distributed task queues, idempotent processors, and PCI-aware integrations handling 1k+ tx/day.",
    tags: ["PHP", "Symfony", "MySQL", "Redis"],
    repo: "https://github.com/NazarAX", // replace
  },
  {
    slug: "openrenderer",
    title: "OpenRenderer",
    description: "A custom C++/OpenGL engine with modular pipelines, ECS, and ray-marched materials.",
    tags: ["C++", "OpenGL", "ECS"],
  },
  {
    slug: "physics-engine",
    title: "Universal Physics Engine",
    description: "Constraint solver, broadphase, continuous collision detection, and robust integrators.",
    tags: ["C++", "Numerics", "Simulation"],
  },
];
