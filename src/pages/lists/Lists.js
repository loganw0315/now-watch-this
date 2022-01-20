import "./Lists.css"

export default function Lists() {
    const name = localStorage.getItem('name')

    return (
        <div>
            Welcome {name}!
        </div>
    )
}
