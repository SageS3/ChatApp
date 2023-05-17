import "./ReauthForm.css"

type ReauthFormProps = {
  setReauthEmail: (e: any) => void
  setReauthPassword: (e: any) => void
  reauthUser: (e: any) => void
  setAuthorizing: (a: boolean) => void
  reauthEmail: string
  reauthPassword: string
  reauthError: string
}

const ReauthForm = (props: ReauthFormProps) => {
  const {
    setReauthEmail,
    setReauthPassword,
    setAuthorizing,
    reauthEmail,
    reauthPassword,
    reauthUser,
    reauthError,
  } = props

  return (
    <div className="auth-modal-container">
      <form className="auth-modal" onSubmit={(event) => reauthUser(event)}>
        <h3>Enter Credentials</h3>
        <input
          type="email"
          placeholder="Email"
          value={reauthEmail}
          onChange={(e) => setReauthEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={reauthPassword}
          onChange={(e) => setReauthPassword(e.target.value)}
        />
        <button type="submit">Confirm</button>
        <button type="button" onClick={() => setAuthorizing(false)}>
          Cancel
        </button>
        {reauthError && <p>{reauthError}</p>}
      </form>
    </div>
  )
}

export default ReauthForm
