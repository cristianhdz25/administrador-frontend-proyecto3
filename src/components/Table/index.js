import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
    TableCaption,
    Button,
    Badge

} from "keep-react";

import {  Funnel, Plus } from 'phosphor-react'

const TableComponent = ({children, headers, length, titulo, total, filtro, openModalRegistrar}) => {
  return (
    <Table className="mx-auto">
    <TableCaption>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">{titulo}</h2>
            <Badge color="secondary" className="dark:bg-metal-800 dark:text-white">
              {total} {titulo}
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            <Button variant="outline" color="success" size="xs" className="flex gap-1.5" onClick={() => openModalRegistrar()}>
              <Plus className="size-4 fill-metal-900 dark:fill-white" />
              Añadir 
            </Button>
            {filtro && 
            <Button variant="outline" color="secondary" size="xs" className="flex gap-1.5">
            <Funnel className="size-4 fill-metal-900 dark:fill-white" />
            Filtrar
            </Button>
            }
          </div>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-center text-body-3">
             <div className="">{header}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {children}
      </TableBody>
    </Table>

  );
};

export default TableComponent;
