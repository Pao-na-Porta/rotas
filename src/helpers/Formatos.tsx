
const sem = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sab'
]

const diasSemana = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
]

export const DataMysql2Date = (dataMySQL:string):Date => {

  if (typeof dataMySQL !== 'string') {
    return new Date();
  }

  if (dataMySQL === null) {
    return new Date()
  }

  if (dataMySQL.length < 10) {
    return new Date()
  }

  let t = dataMySQL.split(/[- :]/)
  let ano = parseInt(t[0])
  let mes = parseInt(t[1])
  let dia = parseInt(t[2])
  let hora = t.length > 3 ? parseInt(t[3]) : 0
  let minuto = t.length > 4 ? parseInt(t[4]) : 0
  let segundo =t.length > 5 ? parseInt(t[5]) : 0

  return new Date(ano, mes - 1, dia, hora, minuto, segundo)

}

export const DataMySQL2Br = (dataMySQL:string):string => {
  if (dataMySQL.length < 10) {
    return ''
  }

  let d = DataMysql2Date(dataMySQL)
  return `${("0" + d.getDate()).slice(-2)}/${("0" + d.getMonth()).slice(-2)}`
}

export const DiaSemana = (dataMySQL:string):string => {
  if (dataMySQL.length < 10) {
    return ''
  }
  return diasSemana[DataMysql2Date(dataMySQL).getDay()]
}