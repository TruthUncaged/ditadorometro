export default function Dimensions({ dimensions }) {
  return (
    <table className="dims">
      <caption>Composição do índice por dimensão</caption>
      <thead>
        <tr>
          <th scope="col">Dimensão</th>
          <th scope="col">Pressão</th>
          <th scope="col" className="num">%</th>
        </tr>
      </thead>
      <tbody>
        {dimensions.map((d) => {
          const pct = Math.round(d.ratio * 100)
          return (
            <tr key={d.id}>
              <th scope="row" title={d.description}>{d.name}</th>
              <td aria-hidden="true">
                <span className="dims__bar"><span style={{ width: `${pct}%` }} /></span>
              </td>
              <td className="num">{pct}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
