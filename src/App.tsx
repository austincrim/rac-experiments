import { CmdK } from "./sections/CmdK"
import { DateRange } from "./sections/DateRange"
import { FileDND } from "./sections/FileDND"
import { FileTree } from "./sections/FileTree"

export function App() {
  return (
    <main className="grid w-full gap-24 px-4 mx-auto my-24 place-content-center">
      <h1 className="font-serif text-2xl">react-aria-components experiments</h1>
      {/* <section>
        <h2 className="font-serif text-lg">File Drag and Drop</h2>
        <FileDND />
      </section>
      <section>
        <h2 className="font-serif text-lg">Command palette</h2>
        <CmdK />
      </section>
      <section>
        <h2 className="font-serif text-lg">Date range calendar</h2>
        <DateRange />
      </section> */}
      <section>
        <h2 className="font-serif text-lg">File tree</h2>
        <FileTree />
      </section>
    </main>
  )
}
