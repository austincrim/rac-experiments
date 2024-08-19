import Folder from "@spectrum-icons/workflow/Folder"
import File from "@spectrum-icons/workflow/FileCode"
import { Input } from "react-aria-components"
import { useTreeData } from "react-stately"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export function FileTree() {
  let tree = useTreeData({
    initialItems: [
      {
        name: "src",
        items: [
          { name: "index.js" },
          { name: "lib", items: [{ name: "util.js" }] },
        ],
      },
      { name: "public", items: [] },
      { name: "package.json" },
    ],
    getKey: (i) => i.name,
  })

  return (
    <div className="flex flex-col ">
      <Input className="border rounded p-1 mb-8" />
      <motion.div layout="position">
        {tree.items.map((i) => (
          <TreeItem item={i.value ?? i} />
        ))}
      </motion.div>
    </div>
  )
}

function TreeItem({ item }) {
  let [open, setOpen] = useState(false)
  if (item.items && item.items.length > 0) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="list-none w-full p-2 rounded-lg transition-colors hover:bg-slate-100 flex items-center gap-1"
        >
          <Folder width={20} height={20} />
          {item.name}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="ml-[22px]"
            >
              {item.items.map((i) => (
                <TreeItem item={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
  return (
    <div className="flex items-center p-2 gap-1">
      <File width={20} height={20} />
      <p>{item.name}</p>
    </div>
  )
}
