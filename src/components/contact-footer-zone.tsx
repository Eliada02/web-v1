export function ContactFooterZone({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dark bg-background text-foreground">
      {children}
    </section>
  );
}
