const FORM_ID = '12cecb7e-72ad-4cd0-b12f-3868272593d0';

export default function BeehiivForm() {
  return (
    <iframe
      src={`https://embeds.beehiiv.com/4/${FORM_ID}?slim=true`}
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
