import { FileTree } from "./sections/FileTree"
import { Button } from "react-aria-components"
import { CmdK } from "./sections/CmdK"
import { DateRange } from "./sections/DateRange"
import { FileDND } from "./sections/FileDND"
import { TagsInput } from "./sections/TagsInput"

export function App() {
  return (
    <main className="grid w-full gap-48 px-4 mx-auto my-24 place-content-center">
      <h1 className="font-serif text-4xl">react-aria-components experiments</h1>
      <section>
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
      </section>
      <section>
        <h2 className="font-serif text-lg">File tree</h2>
        <FileTree />
      </section>
      <section>
        <h2 className="font-serif text-lg">Tags input</h2>
        <TagsInput />
      </section>
      <section>
        <h2 className="font-serif text-lg">Animated Button</h2>
        <Button
          className="border-4 inline-flex border-transparent rounded-md mx-auto"
          style={{
            backgroundImage:
              "conic-gradient(from var(--turn) at 50%, rgb(79 70 229), transparent, transparent, rgb(224 231 255))",
            animation: "spin 500ms ease-out forwards"
          }}
        >
          <span className="px-4 py-2 rounded bg-indigo-600 text-indigo-100">
            Download
          </span>
        </Button>
      </section>
    </main>
  )
}
