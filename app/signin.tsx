import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

function SignInDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>
          <VisuallyHidden>Sign In</VisuallyHidden>
        </DialogTitle>
        {/* ... existing dialog content ... */}
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog 