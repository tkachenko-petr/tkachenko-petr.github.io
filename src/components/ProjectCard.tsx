import type { Project } from '../data/projects'

export function ProjectCard({ project }: { project: Project }) {
  const { screenshot } = project
  const titleId = `project-${project.id}`

  return (
    <article className="project-card" aria-labelledby={titleId} data-scroll-reveal>
      <figure className="project-preview">
        <div className="project-image">
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="text-muted">{screenshot.caption}</figcaption>
      </figure>
      <div className="project-content">
        <p className="project-kind text-caption">{project.kind}</p>
        <h3 id={titleId}>{project.title}</h3>
        <p className="text-body text-muted">{project.description}</p>
        <div className="project-details">
          <h4>Возможности</h4>
          <ul className="project-features text-muted" role="list">
            {project.features.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
          <ul className="project-stack" role="list" aria-label="Технологии">
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <div className="project-actions">
          <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Открыть демо <span aria-hidden="true">↗</span>
          </a>
          {project.repositoryUrl && (
            <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              Исходный код <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
