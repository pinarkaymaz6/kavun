const sinon = require('sinon');
const assert = require('assert');
const runner = require('../lib/runner');

const reporter = {
  step: sinon.spy(),
  result: sinon.spy()
};

(() => {
  // spec('runner', (unit) => {
  //   unit('should execute single executable and report results for steps and overall to reporter', () => {
      const description = 'test';
      const executable = () => {};
      const executables = [{type: 'unit', description, executable }];
      const execute = sinon.stub().returns(true);

      runner(executables, { reporter, execute });

      assert(execute.called);
      assert(reporter.step.calledWith(description, true));
      assert(reporter.result.calledWith(1, 0));
  //   });
  // });
})();

reporter.step.resetHistory();
reporter.result.resetHistory();

(() => {
  // spec('runner', (unit) => {
  //   unit('should execute a spec of executables and report results for steps and overall to reporter', () => {
  const specDescription = 'spec';
  const unitDescription = 'unit';
  const executable = () => {};
  const executables = [{type: 'spec', specDescription, tests: [
    {type: 'unit', description: unitDescription, executable },
    {type: 'unit', description: unitDescription, executable }
  ]}];
  const execute = sinon.stub().returns(true);

  runner(executables, { reporter, execute });

  assert(execute.called);
  assert(reporter.step.calledWith(specDescription));
  assert(reporter.step.calledWith(unitDescription, true));
  assert(reporter.result.calledWith(2, 0));
  //   });
  // });
})();