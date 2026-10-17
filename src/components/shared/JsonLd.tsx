type JsonLdProperties = {
  data: readonly object[];
};

/** `<` is escaped so content can never close the script element early. */
const serialize = (value: object): string => JSON.stringify(value).replaceAll('<', '\\u003c');

/** Renders one `application/ld+json` script per schema object. */
const JsonLd = ({ data }: JsonLdProperties) => {
  return (
    <>
      {data.map(item => {
        const json = serialize(item);
        return (
          <script
            key={json}
            type='application/ld+json'
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: json }}
          />
        );
      })}
    </>
  );
};

export default JsonLd;
