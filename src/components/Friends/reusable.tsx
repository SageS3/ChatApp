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
  ButtonState?: any
}

export const MappedUsers = ({ userArr, ButtonState }: MappedUserProps) => (
  <>
    {userArr.map((user: LimitedUserObj | FullUserObj) => (
      <div className="user-container" key={user.id}>
        <div className="user-image-container">
          <img src={user.photoURL} alt="" />
        </div>
        <p>{user.userName}</p>
        {ButtonState ? (
          <ButtonState userID={user.id} userObj={user} />
        ) : (
          <button>
            <BiMessageSquareEdit />
          </button>
        )}
      </div>
    ))}
  </>
)
