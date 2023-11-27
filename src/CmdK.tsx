import { useEffect, useRef, useState } from 'react'
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
} from 'react-aria-components'
import File from '@spectrum-icons/workflow/AppleFiles'

export function CmdK() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const items = [{ name: 'Snake', Icon: File }]

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
          {({ isEntering }) => (
            <Dialog className="focus:outline-none" aria-label="command bar">
              <ComboBox aria-label="command bar" menuTrigger="focus">
                <Input
                  ref={inputRef}
                  data-entering={isEntering}
                  aria-label="Search for apps, files, anything..."
                  placeholder="Search for apps, files, anything..."
                  className="entering:animate-in entering:fade-in entering:slide-in-from-top-2 fill-mode-forwards w-[66vw] p-3 rounded-t-lg text-stone-800 focus:outline-none bg-stone-100 "
                />
                <Popover
                  offset={0}
                  className="entering:animate-in entering:fade-in entering:slide-in-from-top-2 fill-mode-forwards p-3 border-b-stone-300 border-t-2 w-[66vw] bg-stone-100 text-stone-800 rounded-b-lg"
                >
                  <ListBox>
                    {items.map((i) => (
                      <ListBoxItem className="flex items-center gap-4 p-2 rounded-md focus:bg-stone-200">
                        <i.Icon UNSAFE_className="w-6 h-6" />
                        {i.name}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </ComboBox>
            </Dialog>
          )}
        </Modal>
      </ModalOverlay>
    </>
  )
}
