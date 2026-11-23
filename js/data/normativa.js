/**
 * LEXBOT BOLIVIA - Base de Datos de Normativa Boliviana Fundamental
 * Fuente: Gaceta Oficial del Estado Plurinacional de Bolivia
 */

const NORMATIVA_BOLIVIA = [
  {
    codigo: "CPE",
    nombre: "Constitución Política del Estado (2009)",
    promulgacion: "07 de febrero de 2009",
    fuenteOficial: "http://gacetaoficialdebolivia.gob.bo/edicions/view/11NEC",
    articulosClave: [
      {
        articulo: "Art. 115",
        titulo: "Protección judicial, debido proceso y tutela judicial efectiva",
        texto: "I. Toda persona será protegida oportuna y efectivamente por los jueces y tribunales en el ejercicio de sus derechos e intereses legítimos. II. El Estado garantiza el derecho al debido proceso, a la defensa y a una justicia plural, pronta, oportuna, gratuita, transparente y sin dilaciones."
      },
      {
        articulo: "Art. 116",
        titulo: "Presunción de inocencia e in dubio pro reo",
        texto: "I. Se garantiza la presunción de inocencia. Durante el proceso, en caso de duda sobre la norma aplicable, regirá la más favorable a la persona imputada o procesada."
      },
      {
        articulo: "Art. 117",
        titulo: "Garantía de juicio previo y non bis in idem",
        texto: "I. Ninguna persona puede ser condenada sin haber sido oída y juzgada previamente en un debido proceso. Nadie sufrirá sanción penal que no haya sido impuesta por autoridad judicial competente en sentencia ejecutoriada. II. Nadie será procesado ni condenado más de una vez por el mismo hecho."
      },
      {
        articulo: "Art. 119",
        titulo: "Igualdad procesal y derecho a la defensa técnica y material",
        texto: "I. Las partes en conflicto gozarán de igualdad de oportunidades para ejercer durante el proceso las facultades y los derechos que les asistan. II. Toda persona tiene derecho inviolable a la defensa. El Estado proporcionará a las personas de escasos recursos un defensor público gratuito."
      },
      {
        articulo: "Art. 125",
        titulo: "Acción de Libertad",
        texto: "Toda persona que considere que su vida está en peligro, que es ilegalmente perseguida, o que es indebidamente procesada o privada de libertad personal, podrá interponer Acción de Libertad y acudir de manera oral o escrita ante cualquier juez o tribunal competente."
      },
      {
        articulo: "Art. 128",
        titulo: "Acción de Amparo Constitucional",
        texto: "La Acción de Amparo Constitucional tendrá lugar contra actos u omisiones ilegales o indebidos de los servidores públicos, o de persona individual o colectiva, que restrinjan, supriman o amenacen restringir o suprimir los derechos reconocidos por la Constitución y la ley."
      },
      {
        articulo: "Art. 180",
        titulo: "Principios de la jurisdicción ordinaria",
        texto: "I. La jurisdicción ordinaria se fundamenta en los principios procesales de gratuidad, publicidad, transparencia, oralidad, celeridad, probidad, honestidad, legalidad, eficacia, eficiencia, accesibilidad, inmediatez, verdad material, debido proceso e igualdad de las partes. II. Se garantiza el principio de impugnación en los procesos judiciales."
      },
      {
        articulo: "Art. 256",
        titulo: "Principio de interpretación pro persona y tratados de DDHH",
        texto: "I. Los tratados e instrumentos internacionales en materia de derechos humanos que hayan sido firmados, ratificados o a los que se hubiera adherido el Estado, que declaren derechos más favorables a los contenidos en la Constitución, se aplicarán de manera preferente sobre ésta. II. Los derechos reconocidos en la Constitución serán interpretados de acuerdo a los tratados internacionales de derechos humanos cuando éstos prevean normas más favorables."
      },
      {
        articulo: "Art. 410",
        titulo: "Supremacía constitucional y Bloque de Constitucionalidad",
        texto: "II. La Constitución es la norma suprema del ordenamiento jurídico boliviano y goza de primacía frente a cualquier otra disposición normativa. El bloque de constitucionalidad está integrado por los Tratados y Convenios internacionales en materia de Derechos Humanos y las normas de Derecho Comunitario."
      }
    ]
  },
  {
    codigo: "CPC",
    nombre: "Código Procesal Civil (Ley Nº 439)",
    promulgacion: "19 de noviembre de 2013",
    fuenteOficial: "http://gacetaoficialdebolivia.gob.bo/normas/buscar/439",
    articulosClave: [
      {
        articulo: "Art. 1",
        titulo: "Principios rectores del proceso civil boliviano",
        texto: "Oralidad, inmediación, concentración, dirección, gratuidad, publicidad, saneamiento, legalidad procesal, probidad, celeridad, congruencia y verdad material."
      },
      {
        articulo: "Art. 110",
        titulo: "Estructura y requisitos obligatorios de la demanda",
        texto: "La demanda será presentada por escrito y contendrá: 1. Indicación de la autoridad judicial ante quien se interpusiere. 2. Nombre, domicilio y generales del demandante y demandado. 3. El bien demandado, designándolo con exactitud. 4. La relación precisa de los hechos. 5. La invocación del derecho en que se funda. 6. La cuantía. 7. La petición formulada con toda claridad y precisión."
      },
      {
        articulo: "Art. 128",
        titulo: "Excepciones previas",
        texto: "Son excepciones previas: incompetencia, falta de personería, litispendencia, demanda defectuosa, prescripción, cosa juzgada, transacción, conciliación y desistimiento del derecho."
      },
      {
        articulo: "Art. 213",
        titulo: "Sentencia y congruencia procesal",
        texto: "I. La sentencia pondrá fin al litigio en primera instancia. Recaerá sobre las cosas litigadas en la manera en que hubieren sido demandadas, sabida que fuera la verdad material. Debe contener encabezamiento, parte narrativa con exposición sumaria de hechos, parte motivada con valoración de prueba y parte resolutiva clara y positiva."
      },
      {
        articulo: "Art. 256",
        titulo: "Recurso de apelación y principio de impugnación",
        texto: "El recurso de apelación procede contra las sentencias, autos definitivos y autos interlocutorios que la ley señale expresamente."
      }
    ]
  },
  {
    codigo: "CC",
    nombre: "Código Civil Boliviano (Decreto Ley Nº 12760)",
    promulgacion: "06 de agosto de 1975 (Vigente con modificaciones)",
    fuenteOficial: "http://gacetaoficialdebolivia.gob.bo",
    articulosClave: [
      {
        articulo: "Art. 450",
        titulo: "Noción de contrato",
        texto: "Hay contrato cuando dos o más personas se ponen de acuerdo para constituir, modificar o extinguir entre sí una relación jurídica patrimonial."
      },
      {
        articulo: "Art. 452",
        titulo: "Requisitos esenciales para la formación del contrato",
        texto: "1. El consentimiento de las partes. 2. El objeto. 3. La causa. 4. La forma, siempre que sea legalmente exigible bajo pena de nulidad."
      },
      {
        articulo: "Art. 549",
        titulo: "Causales de nulidad del contrato",
        texto: "El contrato será nulo: 1. Por falta en el objeto o en la forma prescrita. 2. Por falta en los requisitos del consentimiento o de la causa. 3. Por ilicitud de la causa y por ilicitud del motivo común. 4. Por error esencial sobre la naturaleza o sobre el objeto. 5. En los demás casos determinados por la ley."
      },
      {
        articulo: "Art. 568",
        titulo: "Resolución por incumplimiento culposo en contratos bilaterales",
        texto: "I. En los contratos con prestaciones recíprocas, cuando una de las partes no cumple su obligación, la otra puede pedir a su elección el cumplimiento o la resolución del contrato, más el resarcimiento del daño en ambos casos. II. La resolución no puede pedirse si el demandante no cumplió o no ofreció cumplir su propia obligación."
      },
      {
        articulo: "Art. 138",
        titulo: "Usucapión decenal o extraordinaria",
        texto: "La propiedad de un bien inmueble se adquiere también sólo por la posesión continuada durante diez años, sin necesidad de título ni de buena fe."
      }
    ]
  },
  {
    codigo: "CPP",
    nombre: "Código de Procedimiento Penal (Ley Nº 1970 con Ley 1173 de Abreviación Procesal)",
    promulgacion: "25 de marzo de 1999 (Modificado por Ley 1173 de 2019)",
    fuenteOficial: "http://gacetaoficialdebolivia.gob.bo",
    articulosClave: [
      {
        articulo: "Art. 6",
        titulo: "Presunción de inocencia procesal",
        texto: "Toda persona a quien se atribuya un delito se presumirá inocente y será tratada como tal en todo momento mientras no se declare su culpabilidad en sentencia ejecutoriada."
      },
      {
        articulo: "Art. 221",
        titulo: "Finalidad y alcance de las medidas cautelares",
        texto: "La libertad personal y los demás derechos sólo podrán ser restringidos cuando sea absolutamente indispensable para asegurar la averiguación de la verdad, el desarrollo del proceso y la aplicación de la ley."
      },
      {
        articulo: "Art. 233",
        titulo: "Requisitos para la detención preventiva",
        texto: "Procederá la detención preventiva únicamente cuando concurran: 1. Elementos de convicción suficientes para sostener que el imputado es con probabilidad autor o partícipe de un hecho punible; 2. Existencia de elementos que demuestren peligro de fuga o de obstaculización de la averiguación de la verdad."
      },
      {
        articulo: "Art. 239",
        titulo: "Cesación de las medidas cautelares y detención preventiva",
        texto: "La detención preventiva cesará: 1. Cuando nuevos elementos demuestren que ya no concurren los motivos que la fundaron; 2. Cuando su duración exceda el plazo máximo fijado; 3. Por cumplimiento de plazos legales de investigación."
      }
    ]
  },
  {
    codigo: "LGT",
    nombre: "Ley General del Trabajo y Decretos Reglamentarios",
    promulgacion: "08 de diciembre de 1942 (Con D.S. 28699 y D.S. 0495)",
    fuenteOficial: "http://gacetaoficialdebolivia.gob.bo",
    articulosClave: [
      {
        articulo: "Art. 4",
        titulo: "Irrenunciabilidad de los derechos laborales",
        texto: "Los derechos que esta ley reconoce a los trabajadores son irrenunciables, y será nula cualquier convención en contrario."
      },
      {
        articulo: "Art. 13",
        titulo: "Indemnización por tiempo de servicios y desahucio",
        texto: "Cuando fuere retirado el empleado u obrero por causal ajena a su voluntad, el patrono estará obligado a indemnizarle por tiempo de servicios con la suma equivalente a un mes de sueldo por cada año de trabajo continuo."
      },
      {
        articulo: "D.S. 28699 Art. 10",
        titulo: "Reincorporación laboral por despido injustificado",
        texto: "En caso de despido intempestivo e injustificado, el trabajador podrá optar libremente por exigir el pago de sus beneficios sociales o la reincorporación inmediata a su puesto de trabajo con goce de haberes devengados."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NORMATIVA_BOLIVIA };
}
