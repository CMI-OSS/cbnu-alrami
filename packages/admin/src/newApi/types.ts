export interface CMIError {
  error: {
    message: string;
  };
}

export const isOutputType = <
  Output extends { type: string },
  Type extends Output extends { type: infer T } ? T : never,
>(
  output: Output,
  type: Type,
): output is Extract<Output, { type: Type }> => output.type === type;
