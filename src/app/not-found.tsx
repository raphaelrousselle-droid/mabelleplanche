import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-6xl text-ecorce">404</p>
      <h1 className="headline mt-4">Cette page n&apos;existe pas</h1>
      <p className="mt-3 text-brou">
        Le lien est peut-être ancien, ou la planche a changé d&apos;adresse.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Accueil
        </Link>
        <Link href="/catalogue" className="btn btn-ghost">
          Catalogue
        </Link>
      </div>
    </div>
  );
}
