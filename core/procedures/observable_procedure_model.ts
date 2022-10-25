/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {genUid} from '../utils/idgenerator.js';
import type {IParameterModel} from '../interfaces/i_parameter_model.js';
import type {IProcedureModel} from '../interfaces/i_procedure_model.js';
import {triggerProceduresUpdate} from './update_procedures.js';
import type {Workspace} from '../workspace.js';


export class ObservableProcedureModel implements IProcedureModel {
  private id: string;
  private name = '';
  private parameters: IParameterModel[] = [];
  private returnTypes: string[]|null = null;
  private enabled = true;

  constructor(private readonly workspace: Workspace, id?: string) {
    this.id = id ?? genUid();
  }

  /** Sets the human-readable name of the procedure. */
  setName(name: string): this {
    // TODO(#6516): Fire events.
    this.name = name;
    triggerProceduresUpdate(this.workspace);
    return this;
  }

  /**
   * Inserts a parameter into the list of parameters.
   *
   * To move a parameter, first delete it, and then re-insert.
   */
  insertParameter(parameterModel: IParameterModel, index: number): this {
    // TODO(#6516): Fire events.
    this.parameters.splice(index, 0, parameterModel);
    triggerProceduresUpdate(this.workspace);
    return this;
  }

  /** Removes the parameter at the given index from the parameter list. */
  deleteParameter(index: number): this {
    // TODO(#6516): Fire events.
    this.parameters.splice(index, 1);
    triggerProceduresUpdate(this.workspace);
    return this;
  }

  /**
   * Sets the return type(s) of the procedure.
   *
   * Pass null to represent a procedure that does not return.
   */
  setReturnTypes(types: string[]|null): this {
    // TODO(#6516): Fire events.
    this.returnTypes = types;
    triggerProceduresUpdate(this.workspace);
    return this;
  }

  /**
   * Sets whether this procedure is enabled/disabled. If a procedure is disabled
   * all procedure caller blocks should be disabled as well.
   */
  setEnabled(enabled: boolean): this {
    // TODO(#6516): Fire events.
    this.enabled = enabled;
    triggerProceduresUpdate(this.workspace);
    return this;
  }

  /** Returns the unique language-neutral ID for the procedure. */
  getId(): string {
    return this.id;
  }

  /** Returns the human-readable name of the procedure. */
  getName(): string {
    return this.name;
  }

  /** Returns the parameter at the given index in the parameter list. */
  getParameter(index: number): IParameterModel {
    return this.parameters[index];
  }

  /** Returns an array of all of the parameters in the parameter list. */
  getParameters(): IParameterModel[] {
    return [...this.parameters];
  }

  /**
   * Returns the return type of the procedure.
   *
   * Null represents a procedure that does not return a value.
   */
  getReturnTypes(): string[]|null {
    return this.returnTypes;
  }

  /**
   * Returns whether the procedure is enabled/disabled. If a procedure is
   * disabled, all procedure caller blocks should be disabled as well.
   */
  getEnabled(): boolean {
    return this.enabled;
  }
}