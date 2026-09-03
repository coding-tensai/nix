#!/usr/bin/env -S npx tsx

import { Command } from 'commander'
import {registerTreeCommand} from './commands/tree.js'


const program = new Command()

program
  .name("nue")
  .description("A little file manager cli")
  .version("0.0.1")

registerTreeCommand(program)

program.parse()