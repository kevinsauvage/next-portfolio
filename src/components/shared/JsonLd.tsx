import { getNonce } from '@/lib/csp-nonce';

type JsonLdProperties = {
  data: readonly object[];
};

/** `<` is escaped so content can never close the script element early. */
const serialize = (value: object): string => JSON.stringify(value).replaceAll('<', '\\u003c');

/** Renders one nonce'd `application/ld+json` script per schema object. */
const JsonLd = async ({ data }: JsonLdProperties) => {
  const nonce = await getNonce();

  return (
    <>
      {data.map(item => {
        const json = serialize(item);
        return (
          <script
            key={json}
            type='application/ld+json'
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: json }}
          />
        );
      })}
    </>
  );
};

export default JsonLd;
