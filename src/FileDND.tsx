import { DropZone } from 'react-aria-components'
import Folder from '@spectrum-icons/workflow/AppleFiles'
import FolderOpen from '@spectrum-icons/workflow/FolderOpenOutline'
import File from '@spectrum-icons/workflow/FileTxt'
import { useDrag } from 'react-aria'
import { useAnimate } from 'framer-motion'
import { useRef } from 'react'

export function FileDND() {
  const [scope, animate] = useAnimate()
  const folderRef = useRef<HTMLDivElement | null>(null)
  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [
        {
          'text/plain': 'Resume.pdf',
        },
      ]
    },
    getAllowedDropOperations: () => ['move'],
    async onDragEnd(e) {
      if (e.dropOperation === 'move') {
        await animate(
          scope.current,
          {
            scale: 0,
            x:
              folderRef.current?.getBoundingClientRect().x -
              scope.current.getBoundingClientRect().x -
              folderRef.current?.clientWidth,
            rotate: '15deg',
          },
          { duration: 0.3 }
        )
        await new Promise((res) => setTimeout(res, 1000))
        await animate(scope.current, { scale: 1, x: 0, rotate: 0 })
      }
    },
  })
  return (
    <div className="grid grid-cols-2 gap-4 p-8 px-2 border rounded-md place-items-center">
      <div
        {...dragProps}
        ref={scope}
        role="button"
        tabIndex={0}
        className={`whitespace-nowrap w-fit font-mono flex flex-col gap-1 items-center ${
          isDragging && 'opacity-50'
        }`}
      >
        <File width={32} height={32} /> Resume.pdf
      </div>
      <DropZone className="p-4 font-mono transition-colors rounded-lg whitespace-nowrap w-fit drop-target:text-indigo-500">
        {({ isDropTarget }) => (
          <div ref={folderRef} className="flex flex-col items-center gap-1">
            {isDropTarget ? (
              <FolderOpen width={32} height={32} />
            ) : (
              <Folder width={32} height={32} />
            )}{' '}
            Docs
          </div>
        )}
      </DropZone>
    </div>
  )
}
