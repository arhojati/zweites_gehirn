import Link from "next/link";

const NotFound = (): JSX.Element => {
  return (
    <div>
      <h1>Nicht gefunden – 404!</h1>
      <div>
        <Link href="/">Zurück zu Startseite</Link>
      </div>
    </div>
  );
};

export default NotFound;
