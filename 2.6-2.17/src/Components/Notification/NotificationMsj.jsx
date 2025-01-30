import './notification.css'

function NotificationMsj({ notification }) {

  return (
    <div className={`notification ${notification[1]}`}>{notification[0]}</div>
  )
}

export default NotificationMsj