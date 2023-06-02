import { LimitedUserObj, FullUserObj } from "./updateDocUtils"

type AcceptIgnoreButtonsProps = {
  accept: (user: any) => {}
  ignore: (user: any) => {}
  userObj: LimitedUserObj | FullUserObj
}

export const AcceptIgnoreButtons = ({
  accept,
  ignore,
  userObj,
}: AcceptIgnoreButtonsProps) => {
  return (
    <div className="accept-ignore__buttons">
      <button type="button" onClick={() => accept(userObj)}>
        Accept
      </button>
      <button type="button" onClick={() => ignore(userObj)}>
        Ignore
      </button>
    </div>
  )
}
