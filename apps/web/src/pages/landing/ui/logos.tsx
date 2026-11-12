const companies = [
  "Northwind",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark",
];

function Logos() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Нам доверяют команды из 2&nbsp;000+ компаний
      </p>
      <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
        {companies.map((name) => (
          <li
            key={name}
            className="text-center text-lg font-semibold tracking-tight text-muted-foreground/70"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Logos };
