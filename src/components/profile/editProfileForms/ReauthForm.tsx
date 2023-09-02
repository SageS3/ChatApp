import "./ReauthForm.css"

type ReauthFormProps = {
  setReauthUserForm: any
  reauthUserForm: any
  reauthUser: (e: any) => void
  setAuthorizing: (a: boolean) => void
}

const ReauthForm = (props: ReauthFormProps) => {
  const { setReauthUserForm, reauthUserForm, setAuthorizing, reauthUser } =
    props

  const { reauthError, reauthEmail, reauthPassword } = reauthUserForm

  const reauthHandler = (e: any) => {
    const inputName = e.target.name
    setReauthUserForm({ ...reauthUserForm, [inputName]: e.target.value })
  }

  return (
    <div className="auth-modal-container">
      <form className="auth-modal" onSubmit={(event) => reauthUser(event)}>
        <h3>Enter Credentials</h3>
        <input
          name="reauthEmail"
          type="email"
          placeholder="Email"
          value={reauthEmail}
          onChange={reauthHandler}
        />
        <input
          name="reauthPassword"
          type="password"
          placeholder="Password"
          value={reauthPassword}
          onChange={reauthHandler}
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
