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
  userArr: FullUserObj[] | null
  ButtonState?: any
  AcceptIgnoreButtons?: any
  accept?: any
  ignore?: any
}

export const MappedUsers = ({
  userArr,
  ButtonState,
  AcceptIgnoreButtons,
  accept,
  ignore,
}: MappedUserProps) => (
  <>
    {userArr?.map((user: FullUserObj) => (
      <div className="user-container" key={user.id}>
        <div className="user-image-container">
          <img src={user.photoURL} alt="" />
        </div>
        <p>{user.userName}</p>
        {ButtonState ? (
          <ButtonState userID={user.id} userObj={user} />
        ) : (
          <button className="message-button">
            <BiMessageSquareEdit size="1.8rem" color={"rgb(39 194 160)"} />
          </button>
        )}
        {AcceptIgnoreButtons && (
          <AcceptIgnoreButtons
            accept={() => accept(user)}
            ignore={() => ignore(user)}
            userObj={user}
          />
        )}
      </div>
    ))}
  </>
)

export const LoadingUi = () => {
  return (
    <div className="loading-ui">
      <span />
      <span />
      <span />
    </div>
  )
}
