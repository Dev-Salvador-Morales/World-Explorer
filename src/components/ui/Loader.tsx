export default function Loader({label='Cargando...'}:{label?:string}) {
  return <div role="status" aria-live="polite" style={{padding:16}}>{label}</div>;
}
