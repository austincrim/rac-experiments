import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Button,
  ComboBox,
  Dialog,
  Input,
  ListBox,
  ListBoxItem,
  Modal,
  ModalOverlay,
  Popover,
  Text,
} from 'react-aria-components'
import File from '@spectrum-icons/workflow/FileCode'
import Folder from '@spectrum-icons/workflow/Folder'
import Email from '@spectrum-icons/workflow/Email'
import Delete from '@spectrum-icons/workflow/Delete'
import Switch from '@spectrum-icons/workflow/Switch'
import User from '@spectrum-icons/workflow/UserAdd'
import Close from '@spectrum-icons/workflow/Close'
import { useFilter } from 'react-aria'

const items = [
  { id: 1, name: 'Open file...', Icon: File },
  { id: 2, name: 'Create folder...', Icon: Folder },
  { id: 3, name: 'Open email...', Icon: Email },
  { id: 4, name: 'Empty trash', Icon: Delete },
  { id: 5, name: 'Switch workspace...', Icon: Switch },
  { id: 6, name: 'Add teammate...', Icon: User },
  { id: 7, name: 'Quit application', Icon: Close },
]

export function CmdK() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [filterValue, setFilterValue] = useState('')
  const { contains } = useFilter({ sensitivity: 'base' })
  const filteredItems = useMemo(
    () => items.filter((i) => contains(i.name, filterValue)),
    [items, filterValue]
  )

  function toggle(e: KeyboardEvent) {
    if (e.key === 'k' && e.metaKey) {
      setOpen((o) => !o)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', toggle, { capture: true })

    return () => {
      window.removeEventListener('keydown', toggle, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (open) {
      let timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [open])

  return (
    <>
      <Button
        className="flex items-center self-center gap-1 px-4 py-2 transition rounded text-stone-800 focus:outline-none focus-visible:ring ring-stone-600 ring-offset-2 hover:bg-stone-100"
        onPress={() => setOpen(true)}
      >
        <kbd className="p-1 border border-b-2 rounded-md border-stone-400">
          cmd+k
        </kbd>
        to open
      </Button>
      <ModalOverlay
        isOpen={open}
        className="entering:animate-in entering:fade-in fixed inset-0 z-10 pt-[33dvh] flex justify-center min-h-full p-4 overflow-y-auto text-center bg-black/25 backdrop-blur-sm"
      >
        <Modal>
          <Dialog
            className="focus:outline-none entering:animate-in entering:fade-in entering:slide-in-from-top-2 fill-mode-forwards"
            aria-label="command bar"
          >
            <ComboBox
              aria-label="command bar"
              items={filteredItems}
              inputValue={filterValue}
              menuTrigger="focus"
              onInputChange={setFilterValue}
              onSelectionChange={() => {
                setOpen(false)
              }}
            >
              <div className="flex flex-col items-center ">
                <Input
                  ref={inputRef}
                  aria-label="Search for apps, files, anything..."
                  placeholder="Search for apps, files, anything..."
                  className="w-[66vw] p-3 rounded-t-lg text-stone-800 focus:outline-none bg-stone-100 "
                />
                {filteredItems.length === 0 ? (
                  <Text
                    className="p-3 border-b-stone-300 border-t-2 w-[66vw] bg-stone-100 text-stone-800 rounded-b-lg"
                    slot="description"
                  >
                    Hmm, we couldn't find anything
                  </Text>
                ) : (
                  <></>
                )}
              </div>

              <Popover
                offset={0}
                className="p-3 border-b-stone-300 border-t-2 w-[66vw] bg-stone-100 text-stone-800 rounded-b-lg"
              >
                <ListBox className="flex flex-col gap-2">
                  {(i: (typeof items)[number]) => (
                    <ListBoxItem
                      textValue={i.name}
                      className="flex items-center gap-4 p-2 rounded-md focus:bg-stone-200"
                    >
                      <i.Icon width={24} height={24} />
                      {i.name}
                    </ListBoxItem>
                  )}
                </ListBox>
              </Popover>
            </ComboBox>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}
