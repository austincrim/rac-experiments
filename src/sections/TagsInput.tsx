import { Form, Input, Tag, TagGroup, TagList } from "react-aria-components"
import { AnimatePresence, motion } from "framer-motion"
import { useListData } from "react-stately"

let AnimatedList = motion(TagList)
let AnimatedTag = motion(Tag)

let id = 0
export function TagsInput() {
  let list = useListData<{ id: number; text: string }>({
    initialItems: []
  })

  return (
    <div className="flex flex-col max-w-min items-start gap-4 justify-center">
      <Form
        onSubmit={(e) => {
          e.preventDefault()

          list.append({ id: id++, text: e.currentTarget.text.value })

          e.currentTarget.text.value = ""
        }}
      >
        <Input
          name="text"
          placeholder="add filters..."
          required
          autoComplete="off"
          className="border border-zinc-400 focus-visible:outline-none focus-visible:ring-2 ring-sky-400 rounded p-1 w-[50ch]"
        />
      </Form>

      <TagGroup
        selectionMode="multiple"
        onSelectionChange={(keys) => list.setSelectedKeys(keys)}
        onRemove={(keys) => list.remove(...keys)}
      >
        <AnimatedList
          layout="preserve-aspect"
          className="flex gap-1 flex-wrap"
          items={list.items}
        >
          <AnimatePresence>
            {list.items.map((item) => (
              <AnimatedTag
                id={item.id}
                key={item.id}
                layout
                animate={{
                  x: 0,
                  scaleX: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 500, damping: 15 }
                }}
                exit={{
                  scaleX: 0.75,
                  y: 10,
                  opacity: 0,
                  transition: { duration: 0.1, type: "tween" }
                }}
                initial={{ x: -5, scale: 0.9, opacity: 0.5 }}
                className="min-w-[5ch] rounded-full data-[selected]:text-sky-600 focus-visible:outline-none focus-visible:ring-2 ring-offset-0 focus-visible:ring-offset-2 ring-sky-400 transition-[color,box-shadow] duration-100 shadow-sm bg-zinc-50 text-zinc-800 border-current whitespace-nowrap border px-2 py-1 flex gap-1 justify-center items-center"
              >
                {item.text}
              </AnimatedTag>
            ))}
          </AnimatePresence>
        </AnimatedList>
      </TagGroup>
    </div>
  )
}
