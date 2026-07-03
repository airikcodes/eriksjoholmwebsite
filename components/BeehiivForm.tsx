// Publication UUID (pub_e1b09e30... minus the pub_ prefix) — used by the embed URL
const PUB_UUID = 'e1b09e30-8567-4e0f-a940-0ed9680627ec';

export default function BeehiivForm() {
  return (
    <iframe
      src={`https://embeds.beehiiv.com/4/${PUB_UUID}?slim=true`}
      data-test-id="beehiiv-embed"
      width="100%"
      frameBorder="0"
      scrolling="no"
      style={{
        display: 'block',
        width: '100%',
        height: '56px',
        border: 'none',
        borderRadius: 0,
        margin: 0,
      }}
    />
  );
}
