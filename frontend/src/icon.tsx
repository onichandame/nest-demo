import { FC } from 'react'

export const Icon: FC = () => (
  <img
    height="24px"
    alt="heywhale-icon"
    src="data:image/png;base64,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"
  />
)