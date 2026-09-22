import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="muted">Luxury Ayurvedic Formulations</p>
      <h1>Riyansh Amrit</h1>
      <p>
        Authentic Ayurvedic juices, tonics, and supplements — sourced from our
        live catalog, not hardcoded demos.
      </p>
      <div>
        <Link className="btn" href="/store">
          Shop the collection
        </Link>
      </div>
    </section>
  );
}
