/**
 * Icon metadata for skill tags.
 * Prefer Font Awesome brands; fall back to Simple Icons CDN.
 */
export const skillIcons = {
  React: { fa: "fa-brands fa-react", color: "#61DAFB" },
  Angular: { fa: "fa-brands fa-angular", color: "#DD0031" },
  "Node.js": { fa: "fa-brands fa-node-js", color: "#339933" },
  Express: { si: "express", color: "#6E6E73" },
  PHP: { fa: "fa-brands fa-php", color: "#777BB4" },
  TypeScript: { si: "typescript", color: "#3178C6" },
  JavaScript: { fa: "fa-brands fa-js", color: "#F7DF1E" },
  Java: { fa: "fa-brands fa-java", color: "#ED8B00" },
  MongoDB: { si: "mongodb", color: "#47A248" },
  PostgreSQL: { si: "postgresql", color: "#4169E1" },
  MySQL: { si: "mysql", color: "#4479A1" },
  Redis: { si: "redis", color: "#DC382D" },
  Elasticsearch: { si: "elasticsearch", color: "#005571" },
  Microservices: { fa: "fa-solid fa-diagram-project", color: "#0071e3" },
  gRPC: { si: "grpc", color: "#244c5a" },
  Kafka: { si: "apachekafka", color: "#6E6E73" },
  "REST APIs": { fa: "fa-solid fa-plug", color: "#0071e3" },
  AWS: { fa: "fa-brands fa-aws", color: "#FF9900" },
  Docker: { fa: "fa-brands fa-docker", color: "#2496ED" },
  Kubernetes: { si: "kubernetes", color: "#326CE5" },
  "CI/CD": { fa: "fa-solid fa-gears", color: "#6E6E73" },
  Prometheus: { si: "prometheus", color: "#E6522C" },
  Grafana: { si: "grafana", color: "#F46800" },
  Terraform: { si: "terraform", color: "#7B42BC" },
  "GitHub Copilot": { fa: "fa-brands fa-github", color: "#1d1d1f" },
  "Cursor AI": { fa: "fa-solid fa-i-cursor", color: "#0071e3" },
  "Generative AI": { fa: "fa-solid fa-wand-magic-sparkles", color: "#0071e3" },
};

export function getSkillIcon(name) {
  return skillIcons[name] || { fa: "fa-solid fa-code", color: "#86868b" };
}

export function simpleIconUrl(slug, color) {
  const hex = (color || "86868b").replace("#", "");
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}
