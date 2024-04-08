import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const err = useRouteError()

  return (
    <div>
      <h1>Opps</h1>
      <div>Something went wrong</div>
      <div>{err.status}:{err.statusText}</div>
    </div>
  )
}

export default Error