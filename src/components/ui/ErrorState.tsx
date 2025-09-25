export default function ErrorState({msg}:{msg:string}) {
  return <div role="alert" style={{padding:16,color:'#b00'}}>⚠️ {msg}</div>;
}
