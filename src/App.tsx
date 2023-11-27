import { CmdK } from './CmdK'
import { FileDND } from './FileDND'

export function App() {
  return (
    <main className="grid w-full gap-24 px-4 mx-auto mt-24 place-content-center">
      <h1 className="font-serif text-2xl">react-aria-components experiments</h1>
      <section>
        <h2 className="font-serif text-lg">File Drag and Drop</h2>
        <FileDND />
      </section>
      <section>
        <h2 className="font-serif text-lg">Command palette</h2>
        <CmdK />
      </section>
    </main>
  )
}
