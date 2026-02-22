type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow ? <p className="text-sm uppercase tracking-[0.18em] text-electric">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold leading-tight text-textPrimary md:text-4xl">{title}</h2>
      {description ? <p className="text-lg text-textSecondary">{description}</p> : null}
    </div>
  );
}
