import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ServiceCard({ title, description, image, index }: Props) {
  const offset = index % 3;
  const translateClass =
    offset === 0 ? "md:translate-y-0" : offset === 1 ? "md:translate-y-16" : "md:translate-y-8";

  return (
    <article className={`group relative ${translateClass}`}>
      <div className="overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl text-foreground">{title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <ArrowUpRight
          className="mt-2 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          size={22}
        />
      </div>
    </article>
  );
}
