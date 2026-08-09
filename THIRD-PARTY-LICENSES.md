# Third-party licences

## Material Design menu icon

The menu icon embedded in `index.html` is adapted from Google's Material Design
Icons and is used under the
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## hatviz (hat monotile metatile construction)

`src/tilings/hat.ts` is a TypeScript port of the H/T/P/F metatile construction from
Craig S. Kaplan's [hatviz](https://github.com/isohedral/hatviz), the reference
implementation accompanying *An aperiodic monotile* (Smith, Myers, Kaplan,
Goodman-Strauss, 2023).

```
BSD 3-Clause License

Copyright (c) 2023, Craig S. Kaplan

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

## Voderberg turtle grammar

The numerical turtle grammar used to construct the Voderberg boundary graph
is credited to Herb Savage and was distributed with Fractint's
[`tiling.l`](https://github.com/LegalizeAdulthood/fractint/blob/master/fractint/lsystem/tiling.l),
where it is described as being based on Martin Gardner's published
construction. `src/tilings/voderberg.ts` independently expands that grammar,
polygonises its planar boundary graph, and emits the bounded nonagonal faces.

Every other tiling in this repository is generated from geometry derived in
`src/tilings/`, with no third-party code.
