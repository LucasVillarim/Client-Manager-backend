import {
  Document,
  Packer,
  Header,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  VerticalAlign,
} from 'docx';

import { Request, Response } from 'express';

class Docx {
  // eslint-disable-next-line class-methods-use-this
  public async generator(req: Request, res: Response) {
    const {
      name,
      email,
      contact,
      company,
      date,
      situation,
      products,
    } = req.body.formData;

    const doc = new Document();

    const tableHeader = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Produto')],
        }),
        new TableCell({
          children: [new Paragraph('Preço (R$)')],
        }),
      ],
    });

    const tableRow = products.map((element: any) => {
      return new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph(`${element.product}`)],
          }),
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph(`${element.price}`)],
          }),
        ],
      });
    });

    doc.addSection({
      properties: {},

      children: [
        new Paragraph({
          text: 'Log de Clientes',
          heading: HeadingLevel.HEADING_1,
          thematicBreak: true,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 300,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `Nome do Cliente: ${name}`, size: 26 }),
            new TextRun({ text: `E-mail: ${email}`, size: 26 }).break(),
            new TextRun({ text: `Número: ${contact}`, size: 26 }).break(),
            new TextRun({
              text: `Serviço contratado: ${company}.`,
              size: 26,
            }).break(),
            new TextRun({ text: `Data: ${date}.`, size: 26 }).break(),
            new TextRun({
              text: `Situação do Projeto: ${situation}.`,
              size: 26,
            }).break(),
          ],
        }),

        new Table({
          rows: [tableHeader],
        }),
        new Table({
          rows: tableRow,
        }),
      ],
    });

    const b64string = await Packer.toBase64String(doc);

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=MyDocument.docx',
    );
    // eslint-disable-next-line prettier/prettier
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    // res.send(Buffer.from(b64string, 'base64'));
    res.setHeader('Content-Transfer-Encoding', 'base64');

    res.send(b64string);
  }
}

export default new Docx();
