import { LimitedUserObj, FullUserObj } from "./updateDocUtils"
import { BiMessageSquareEdit } from "react-icons/bi"

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

type MappedUserProps = {
  userArr: LimitedUserObj[] | FullUserObj[]
  buttonState?: (a: string, b: FullUserObj) => JSX.Element
}

const fullUserObjTypeCheck = (
  userArr: LimitedUserObj | FullUserObj
): userArr is FullUserObj => {
  return true
}

export const MappedUsers = ({ userArr, buttonState }: MappedUserProps) => (
  <>
    {userArr.map((user: LimitedUserObj | FullUserObj) => (
      <div className="user-container" key={user.id}>
        <div className="user-image-container">
          <img src={user.photoURL} />
        </div>
        <p>{user.userName}</p>
        {/* {fullUserObjTypeCheck(user) && buttonState(user.id, user)} */}
      </div>
    ))}
  </>
)
