export interface AbstractOutput {
  buildContent (path: string, workDir: string)
  output ()
}
